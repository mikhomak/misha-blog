use rocket_dyn_templates::{Template, context};
use misha_blog::PgConnection;
use misha_blog::schema::posts::dsl::posts;
use diesel::query_dsl::RunQueryDsl;

#[get("/")]
pub async fn index(connection: PgConnection) -> Template {
    use misha_blog::models::Post;
    Template::render("index", context! {
        posts: connection.run(|c| posts.load::<Post>(c))
        .await
        .unwrap()
    })
}

#[get("/posts/<id>")]
pub fn post_page(id: &str) -> Template {
    Template::render("posts/".to_owned() + id, context! { name: "post" })
}