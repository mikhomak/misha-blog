// @generated automatically by Diesel CLI.

diesel::table! {
    comments (id) {
        id -> Int4,
        author -> Varchar,
        content -> Text,
        creation_time -> Time,
        post_id -> Int4,
    }
}

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        content -> Text,
        short_content -> Text,
        #[max_length = 1]
        allow_comments -> Nullable<Bit>,
        amount_of_likes -> Numeric,
        creation_time -> Time,
        views -> Int4,
    }
}

diesel::table! {
    siteconfigurations (id) {
        id -> Int4,
        #[max_length = 1]
        allow_site_comments -> Bit,
    }
}

diesel::joinable!(comments -> posts (post_id));

diesel::allow_tables_to_appear_in_same_query!(
    comments,
    posts,
    siteconfigurations,
);
