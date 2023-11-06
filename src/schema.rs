// @generated automatically by Diesel CLI.

diesel::table! {
    comments (id) {
        id -> Int4,
        author -> Varchar,
        content -> Text,
        creation_time -> Date,
        post_id -> Varchar,
    }
}

diesel::table! {
    posts (id) {
        id -> Varchar,
        title -> Varchar,
        short_content -> Text,
        allow_comments -> Bool,
        amount_of_likes -> Int4,
        creation_time -> Date,
        views -> Int4,
    }
}

diesel::table! {
    siteconfigurations (id) {
        id -> Int4,
        allow_site_comments -> Bool,
    }
}

diesel::joinable!(comments -> posts (post_id));

diesel::allow_tables_to_appear_in_same_query!(
    comments,
    posts,
    siteconfigurations,
);
