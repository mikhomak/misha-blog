use std::error::Error;
use std::fmt;

#[derive(Debug)]
pub struct PostNotFoundError {
    pub(crate) post_id: String
}

impl PostNotFoundError {
    pub(crate) fn new(msg: &str) -> PostNotFoundError {
        PostNotFoundError { post_id: msg.to_string()}
    }
}

impl fmt::Display for PostNotFoundError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f,"Post with id {} not found!",self.post_id)
    }
}

impl Error for PostNotFoundError {
    fn description(&self) -> &str {
        &self.post_id
    }
}