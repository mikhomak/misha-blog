use rocket_dyn_templates::{Template, context};
use misha_blog::PgConnection;
use diesel::query_dsl::RunQueryDsl;
use misha_blog::schema::posts::dsl::posts;

mod post_services;

#[get("/")]
pub async fn index(connection: PgConnection) -> Template {
    use misha_blog::models::Post;
    Template::render("index", context! {
        posts: connection.run(|c| posts.load::<Post>(c))
        .await
        .unwrap()
    })
}

#[get("/posts/<post_id>")]
pub async fn post_page(post_id: &str, connection: PgConnection) -> Template {
    use misha_blog::models::PostWithComments;

    let are_comments_allowed: bool = post_services::are_comments_allowed(&connection, "posts/".to_owned() + post_id)
        .await;

    let post_with_comments: PostWithComments = post_services::get_post_with_comments(post_id, &connection).await;

    Template::render("posts/".to_owned() + post_id, context! {
        name: "post" ,
        post: post_with_comments,
        are_comments_allowed: are_comments_allowed,
    })
}
