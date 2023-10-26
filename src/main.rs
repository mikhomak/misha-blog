#[macro_use]
extern crate rocket;

use rocket_contrib::templates::Template;

#[get("/")]
fn index() -> Template {
    Template::render("index", context { name: "hello" })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .mount("/", routes![index])
}
