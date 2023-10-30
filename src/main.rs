
#[macro_use]
extern crate rocket;

mod controller;

use rocket_dyn_templates::{Template};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .mount("/", routes![controller::index, controller::post_page])
}
