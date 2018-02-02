$(document).ready(function() {
    $(".save-btn").on("click", function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        $.post("/articles/" + id).then(function(data) {
            location.reload();
        });
    });

    $(".unSave-btn").on("click", function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        $.post("/saved/" + id).then(function(data) {
            location.reload();
        });
    });
    
    $(".note-btn").on("click", function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        $.get("/note/" + id).then(function(data) {
            console.log(data.note);
            $("#note-modal").modal("toggle");
            $(".notes").empty();
            for (var i = 0; i < data.note.length; i++) {
                var newNote = ("<div class='well'>");
                newNote = $(newNote).append("<p>" + data.note[i].body + "</p>");
                $(".notes").append(newNote);
            }
        })
        $("#note-post-btn").on("click", function(e) {
            e.preventDefault();
            var body = $("#comment").val().trim();
            $.post("/note/" + id, {
                body: body
            }).then(function(data) {
                location.reload();
            })
        })
    })

    $("#scrape-btn").on("click", function(e) {
        e.preventDefault();
        $.get("/scrape").then(function() {
            $("#scrape-modal").modal("toggle");
            $("#modal-close-btn").on("click", function() {
                location.reload();
            })
        })
    })
});