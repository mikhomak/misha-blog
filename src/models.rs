use diesel::{Queryable};
use chrono::NaiveDate;
use rocket::serde::Deserialize;
use serde::Serialize;

#[derive(Serialize, Queryable, Selectable, Identifiable)]
#[diesel(table_name = crate::schema::posts)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Post {
    pub id: String,
    pub title: String,
    pub short_content: String,
    pub allow_comments: bool,
    pub amount_of_likes: i32,
    pub creation_time: NaiveDate,
    pub views: i32,
}

#[derive(Serialize, Queryable, Selectable, Identifiable, Associations)]
#[diesel(belongs_to(Post, foreign_key = post_id))]
#[diesel(table_name = crate::schema::comments)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Comment {
    pub id: i32,
    pub author: String,
    pub content: String,
    pub creation_time: NaiveDate,
    pub post_id: String,
}

#[derive(Deserialize, Insertable, Debug)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = crate::schema::comments)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewComment {
    pub author: String,
    pub content: String,
    pub creation_time: NaiveDate,
    pub post_id: String
}


#[derive(Serialize, Queryable, Selectable, Identifiable)]
#[diesel(table_name = crate::schema::siteconfigurations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct SiteConfiguration {
    pub id: i32,
    pub allow_site_comments: bool,
}

#[derive(Serialize)]
pub struct PostWithComments {
    #[serde(flatten)]
    pub post: Post,
    pub comments: Vec<Comment>,
}