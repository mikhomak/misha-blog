pub mod models;
pub mod schema;

#[macro_use]
extern crate diesel;
use rocket_sync_db_pools::database;

#[database("misha-blog")]
pub struct PgConnection(diesel::PgConnection);
