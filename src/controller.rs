use rocket_dyn_templates::{Template, context};

#[get("/")]
pub fn index() -> Template {
    Template::render("index", context! { name: "asdsadasdsa" })
}

#[get("/posts/<id>")]
pub fn post_page(id: &str) -> Template {
    Template::render("posts/".to_owned() + id, context! { name: "post" })
}