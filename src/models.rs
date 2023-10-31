use diesel::{Queryable};
use chrono::NaiveDate;
use serde::Serialize;

#[derive(Serialize, Queryable, Selectable)]
#[diesel(table_name = crate::schema::posts)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub short_content: String,
    pub allow_comments: bool,
    pub amount_of_likes: i32,
    pub creation_time: NaiveDate,
    pub views: i32,
}
