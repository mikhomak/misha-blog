#[macro_use]
extern crate rocket;

mod controller;
mod error_catcher;

use rocket_dyn_templates::{Template};
use misha_blog::PgConnection;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .attach(PgConnection::fairing())
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
