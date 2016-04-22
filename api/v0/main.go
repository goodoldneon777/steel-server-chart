package main

import (
    "log"
    "net/http"
)

func main() {

    router := NewRouter()

    log.Fatal(http.ListenAndServe(":8080", router))
    // log.Fatal(http.ListenAndServe(":8000", handlers.CORS()(router)))
}