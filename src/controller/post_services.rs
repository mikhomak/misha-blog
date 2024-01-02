use misha_blog::schema::posts as schema_posts;
use misha_blog::schema::comments as schema_comments;
use misha_blog::schema::siteconfigurations::dsl::siteconfigurations;
use diesel::{ExpressionMethods, QueryDsl, QueryResult, RunQueryDsl};
use misha_blog::models::{Comment, Post, SiteConfiguration, PostWithComments, NewComment};
use misha_blog::PgConnection;
use misha_blog::schema::comments::dsl::comments;
use misha_blog::schema::posts::amount_of_likes;
use misha_blog::schema::posts::dsl::posts;
use crate::controller::post_services::errors::PostNotFoundError;

pub(crate) mod errors;

/// Get post with comments
pub(crate) async fn get_post_with_comments(post_id: &str, connection: &PgConnection) -> Result<PostWithComments, PostNotFoundError> {
    let r_post = get_post_for_id(connection, post_id).await;
    match r_post {
        Ok(post) => {
            let r_post_comments = get_comments_for_post(post_id, connection).await;
            match r_post_comments {
                Ok(resolved_comments) => Ok(PostWithComments { post, comments: resolved_comments }),
                Err(_error) => Ok(PostWithComments { post, comments: vec![] })
            }
        }
        Err(_error) => Err(PostNotFoundError::new(post_id))
    }
}

async fn get_post_for_id(connection: &PgConnection, id: &str) -> QueryResult<Post> {
    let owned_post_id = id.to_string();
    connection.run(move |c|
        {
            posts
                .filter(schema_posts::id.eq(owned_post_id))
                .first::<Post>(c)
        })
        .await
}

async fn get_comments_for_post(post_id: &str, connection: &PgConnection) -> QueryResult<Vec<Comment>> {
    let owned_post_id = post_id.to_string();
    connection.run(move |c|
        {
            comments
                .filter(schema_comments::post_id.eq(owned_post_id))
                .load::<Comment>(c)
        })
        .await
}

/// Are commented allowed for post?
pub(crate) async fn are_comments_allowed(connection: &PgConnection, post_id: &str) -> bool {
    are_site_comments_allowed(connection).await &&
        are_post_comments_allowed(connection, post_id).await
}

async fn are_post_comments_allowed(connection: &PgConnection, post_id: &str) -> bool {
    let owned_post_id: String = post_id.to_string();
    connection.run(move |c|
        posts.filter(schema_posts::id.eq(owned_post_id))
            .first::<Post>(c))
        .await
        .map_or(false, |post| post.allow_comments)
}

async fn are_site_comments_allowed(connection: &PgConnection) -> bool {
    let r_site_configurations = connection.run(|c| siteconfigurations.load::<SiteConfiguration>(c))
        .await;
    match r_site_configurations {
        Ok(site_configurations) => site_configurations
            .first()
            .map_or(false, |site_configuration: &SiteConfiguration| site_configuration.allow_site_comments),
        Err(_error) => false
    }
}

/// Like comment
pub async fn like_post(post_id: &str, connection: &PgConnection) -> Result<i32, PostNotFoundError> {
    let owned_post_id = post_id.to_string();
    let r_updated_post = connection.run(|c| {
        diesel::update(posts.find(owned_post_id))
            .set(amount_of_likes.eq(amount_of_likes + 1))
            .get_result::<Post>(c)
    }).await;

    match r_updated_post {
        Ok(updated_post) => Ok(updated_post.amount_of_likes),
        Err(_) => Err(PostNotFoundError::new(post_id))
    }
}

pub async fn add_comment(new_comment: NewComment, connection: &PgConnection) -> Result<(), PostNotFoundError> {
    let owned_post_id: String = new_comment.post_id.to_string();
    let r_new_comment = connection.run(|c| {
        diesel::insert_into(comments)
            .values(new_comment)
            .get_result::<Comment>(c)
    }).await;

    match r_new_comment {
        Ok(_) => Ok(()),
        Err(_) => Err(PostNotFoundError::new(&owned_post_id))
    }
}
