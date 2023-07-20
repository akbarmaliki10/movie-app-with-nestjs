const data : Data = {
    movies: []
}

interface Data {
    movies : {
        movieName : string,
        rating : number,
        description : string,
        nowShowing : true | false
    }[]
}

enum Availability {
    NOW_SHOWING = "now_showing",
    COMING_SOON = "coming_soon",
    FINISHED = "finished"
}