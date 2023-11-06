use misha_blog::schema::posts as schema_posts;
use misha_blog::schema::comments as schema_comments;
use misha_blog::schema::siteconfigurations::dsl::siteconfigurations;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use misha_blog::models::{Comment, Post, SiteConfiguration, PostWithComments};
use misha_blog::PgConnection;
use misha_blog::schema::comments::dsl::comments;
use misha_blog::schema::posts::dsl::posts;

pub(crate) async fn get_post_with_comments(post_id: &str, connection: &PgConnection) -> PostWithComments {
    let id = post_id.to_lowercase();
    let post = connection.run(move |c|
        posts
            .filter(schema_posts::id.eq(id))
            .first::<Post>(c))
        .await
        .unwrap();

    let comment_post_id = post_id.to_lowercase();
    let post_comments = connection.run(move |c|
        comments
            .filter(schema_comments::post_id.eq(comment_post_id))
            .load::<Comment>(c))
        .await
        .unwrap();

    return PostWithComments { post, comments: post_comments };
}

pub(crate) async fn are_comments_allowed(connection: &PgConnection, post_id: String) -> bool {
    are_site_comments_allowed(connection).await &&
        are_post_comments_allowed(connection, post_id).await
}

async fn are_post_comments_allowed(connection: &PgConnection, post_id: String) -> bool {
    connection.run(|c| posts.filter(schema_posts::id.eq(post_id)).first::<Post>(c))
        .await
        .map_or(false, |post| post.allow_comments)
}

async fn are_site_comments_allowed(connection: &PgConnection) -> bool {
    connection.run(|c| siteconfigurations.load::<SiteConfiguration>(c))
        .await
        .unwrap()
        .first()
        .map_or(false, |site_configuration: &SiteConfiguration| site_configuration.allow_site_comments)
}