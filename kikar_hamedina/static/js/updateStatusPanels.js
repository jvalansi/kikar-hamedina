// AJAX that updates the stats for every status-panel.
$(document).ready(function () {
    $(".status-panel").each(function (index) {
        var status_id = $(this).data("statusid");
        update_status_url = "/status_update/" + status_id + "/"
        $("#status-metrics-is-updating-indicator-" + status_id).removeClass("hidden-object");
        $.ajax({
            url: update_status_url,
            contentType: "application/json",
            success: function (data) {
                $("#" + data['id'] + "-likes").text(data['likes'])
                $("#" + data['id'] + "-comments").text(data['comments'])
                $("#" + data['id'] + "-shares").text(data['shares'])
                $("#status-metrics-is-updating-indicator-" + data['id']).addClass("hidden-object")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                responseText = JSON.parse(jqXHR.responseText);
//                console.log($("#status-metrics-is-updating-indicator-" + data['id']));
                $("#status-metrics-is-updating-indicator-" + responseText).addClass("hidden-object")
                $("#status-metrics-is-error-indicator-" + responseText).removeClass("hidden-object")
            }
        });
    });
});
