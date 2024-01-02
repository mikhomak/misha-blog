extern crate rocket;

use rocket_dyn_templates::{context, Template};

#[catch(500)]
pub fn internal_server_error() -> Template {
    Template::render("500", context! {})
}

#[catch(default)]
pub fn default_error() -> Template {
    Template::render("500", context! {})
}


#[catch(422)]
pub fn validation_error() -> Template {
    Template::render("422", context! {})
}