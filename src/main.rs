
#[macro_use]
extern crate rocket;

mod controller;

use rocket_dyn_templates::{Template};
use misha_blog::PgConnection;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .attach(PgConnection::fairing())
        .mount("/", routes![controller::index, controller::post_page])
}
