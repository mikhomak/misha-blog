use log::{warn, error};
use chrono::NaiveDate;
use rocket_dyn_templates::{Template, context};
use misha_blog::PgConnection;
use diesel::query_dsl::RunQueryDsl;
use diesel::QueryResult;
use rocket::form::Form;
use rocket::response::Redirect;
use misha_blog::models::{NewComment, PostWithComments};
use misha_blog::schema::posts::dsl::posts;
use crate::controller::post_services::errors::PostNotFoundError;

mod post_services;

#[get("/")]
pub async fn index(connection: PgConnection) -> Template {
    use misha_blog::models::Post;
    let r_posts: QueryResult<Vec<Post>> = connection.run(|c| posts.load::<Post>(c))
        .await;
    let found_posts: Vec<Post> = match r_posts {
        Ok(resolved_posts) => resolved_posts,
        Err(_error) => vec![]
    };
    Template::render("index", context! {
        posts: found_posts
    })
}

#[get("/about")]
pub fn about() -> Template {
    Template::render("about", context! {})
}

#[get("/contact")]
pub fn contact() -> Template {
    Template::render("contact", context! {})
}

#[get("/posts/<post_id>")]
pub async fn post_page(post_id: &str, connection: PgConnection) -> Template {
    let are_comments_allowed: bool = post_services::are_comments_allowed(&connection, post_id)
        .await;

    let r_post_with_comments: Result<PostWithComments, PostNotFoundError> =
        post_services::get_post_with_comments(post_id, &connection).await;

    construct_post_page(post_id, r_post_with_comments, are_comments_allowed)
}

#[post("/posts/<post_id>/like")]
pub async fn like_post(post_id: &str, connection: PgConnection) -> String {
    let r_likes: Result<i32, PostNotFoundError> = post_services::like_post(post_id, &connection).await;
    match r_likes {
        Ok(likes) => likes.to_string(),
        Err(_error) => "Oopsie, there was an error".to_string()
    }
}


#[derive(FromForm)]
pub struct NewCommentForm {
    author: String,
    text: String,
}

#[post("/posts/<post_id>/comment", data = "<new_comment>")]
pub async fn add_comment(post_id: &str, new_comment: Form<NewCommentForm>, connection: PgConnection) -> Redirect {
    let form: NewCommentForm = new_comment.into_inner();
    let are_comments_allowed: bool = post_services::are_comments_allowed(&connection, post_id)
        .await;

    if are_comments_allowed == false {
        warn!("Comments to post {post_id} are not allowed. But somebody still tried to do so, aka {0}... Redirecting it back to the post page", form.author);
        Redirect::to(uri!(post_page(post_id)));
    }

    let r_adding_comment: Result<(), PostNotFoundError> =
        post_services::add_comment(NewComment {
            post_id: post_id.to_string(),
            author: form.author,
            content: form.text,
            creation_time: NaiveDate::default(),
        }, &connection).await;

    match r_adding_comment {
        Ok(_) => Redirect::to(uri!(post_page(post_id))),
        Err(error) => {
            error!("While posting a comment to post {post_id} there was an error {error}");
            Redirect::to(uri!("500"))
        }
    }
}

fn construct_post_page(post_id: &str,
                       r_post_with_comments: Result<PostWithComments, PostNotFoundError>,
                       are_comments_allowed: bool) -> Template {
    match r_post_with_comments {
        Ok(post_with_comments) => {
            Template::render(format!("posts/{post_id}"), context! {
                post: post_with_comments,
                are_comments_allowed: are_comments_allowed,
            })
        }
        Err(error) => {
            error!("There was an exception while constructing the {post_id} post page. Error - {error}");
            Template::render("404", context! {})
        }
    }
}