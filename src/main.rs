#[macro_use]
extern crate rocket;

mod controller;
mod error_catcher;

use std::path::Path;
use rocket::fs::{FileServer, NamedFile, relative};
use rocket_dyn_templates::{Template};
use misha_blog::PgConnection;

#[get("/favicon.ico")]
pub async fn favicon() -> Option<NamedFile> {
    let path: &Path = Path::new(relative!("static/favicon.ico"));
    NamedFile::open(path).await.ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .attach(PgConnection::fairing())
        .mount("/", FileServer::from(relative!("/static")))
        .mount("/", routes![favicon])
        .mount("/", routes![
            controller::index,
            controller::post_page,
            controller::like_post,
            controller::add_comment,
            controller::about,
            controller::contact
        ])
        .register("/",
                  catchers![error_catcher::internal_server_error,
                  error_catcher::default_error,
                  error_catcher::validation_error])
}
