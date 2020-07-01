let initModalCreateLair = (result) => {
    let modal = document.getElementById('modalCreateLair');
    let btn = document.getElementById("btn-create-lair");
    btn.onclick = function() {
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryState. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillStatus);
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryLegalType. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillLegalType);
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryType. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillType);
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryGroup. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillGroup);
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryLanguage. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillLanguage);
        TS.query("SELECT * WHERE { ?s a hsq:RepositoryQuality. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillQuality);
        modal.style.display = "block";
    }
    $("#btn-modal-create-lair-close").click(function() {
        modal.style.display = "none";
    });
    $("#btn-modalCreateLair").on('click', () => {
        createToolTTL();
        copyToClipboard('#hiddenclipboard');
    });
};

let fillStatus = (response) => {
    $("#sel-status").html("");
    $("#sel-status").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-status").append(opt);
    }
};

let fillLegalType = (response) => {
    $("#sel-legaltype").html("");
    $("#sel-legaltype").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-legaltype").append(opt);
    }
};

let fillType = (response) => {
    $("#sel-type").html("");
    $("#sel-type").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-type").append(opt);
    }
};

let fillGroup = (response) => {
    $("#sel-group").html("");
    $("#sel-group").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-group").append(opt);
    }
};

let fillLanguage = (response) => {
    $("#sel-language").html("");
    $("#sel-language").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-language").append(opt);
    }
};

let fillQuality = (response) => {
    $("#sel-quality").html("");
    $("#sel-quality").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-quality").append(opt);
    }
};

$("#btn-entitysearch").click(function() {
    TS.queryWikidataEntity($("#inp-wikidatastr").val(), fillWikidataEntity);
});

let fillWikidataEntity = (response) => {
    $("#inp-wikidata").val("");
    let eid = Object.keys(response.entities)[0];
    $("#inp-wikidata").val(response.entities[eid].id + " | " + response.entities[eid].labels.en.value).attr("uri", "wd:" + response.entities[eid].id);
    $("#inp-wikidata").css("background-color", "LIGHTGREEN");
};

let copyToClipboard = (element) => {
    var text = $("#hiddenclipboard").clone().find('br').prepend('\r\n').end().val();
    element = $('<textarea>').appendTo('body').val(text).select();
    document.execCommand('copy');
    element.remove();
};

let createToolTTL = () => {
    // check input fields
    let valide = true;
    if ($("#inp-wikidata").val().includes("null")) {
        valide = false;
        console.log(false, "wikidata");
    }
    if ($("#inp-name").val().length === 0) {
        valide = false;
        console.log(false, "name");
    }
    if ($("#inp-description").val().length === 0) {
        valide = false;
        console.log(false, "description");
    }
    if ($("#inp-creator").val().length === 0) {
        valide = false;
        console.log(false, "creator");
    }
    if ($("#sel-status option:selected").val() === "-1") {
        valide = false;
        console.log(false, "status");
    }
    if ($("#sel-legaltype option:selected").val() === "-1") {
        valide = false;
        console.log(false, "legaltype");
    }
    if ($("#sel-type option:selected").val() === "-1") {
        valide = false;
        console.log(false, "type");
    }
    if ($("#sel-quality option:selected").val() === "-1") {
        valide = false;
        console.log(false, "quality");
    }

    if (valide == false) {
        $("#alertdiv").show();
        $("#successdiv").hide();
        $("#hiddenclipboard").val("");
    } else {
        $("#alertdiv").hide();
        $("#successdiv").show();
        // create triples
        let lairID = UUID.getHashDigits(8);
        let lairURI = "lair:" + lairID;
        let ttl = "";
        /*ttl += "@prefix hsq: <http://hungry.squirrel.link/ontology#> .\r\n";
        ttl += "@prefix lair: <http://lod.squirrel.link/data/dragonlair/> .\r\n";
        ttl += "@prefix wd: <http://www.wikidata.org/entity/> .\r\n";
        ttl += "@prefix owl: <http://www.w3.org/2002/07/owl#> .\r\n";
        ttl += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\r\n\r\n";*/
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        ttl += "# " + $('#inp-name').val() + "\r\n";
        ttl += lairURI + " a " + "hsq:DataDragonLair " + ".\r\n";
        ttl += lairURI + " owl:sameAs " + "" + $("#inp-wikidata").attr("uri") + "" + ".\r\n";
        ttl += lairURI + " rdfs:type " + "'" + $('#inp-name').val() + "'" + ".\r\n";
        ttl += lairURI + " hsq:name " + "'" + $('#inp-name').val() + "'" + ".\r\n";
        ttl += lairURI + " hsq:wikidataid " + "'" + $("#inp-wikidata").attr("uri").replace("wd:", "") + "'" + ".\r\n";
        ttl += lairURI + " hsq:description " + "'" + $('#inp-description').val() + "'" + ".\r\n";
        ttl += lairURI + " hsq:author " + "'" + $('#inp-creator').val() + "'" + ".\r\n";
        ttl += lairURI + " hsq:dateOfEntry " + "'" + formatted_date + "'" + ".\r\n";
        if ($("#inp-sparql").val().includes("http")) {
            ttl += lairURI + " hsq:sparqlendpoint " + "<" + $('#inp-sparql').val() + ">" + ".\r\n";
        }
        if ($("#inp-api").val().includes("http")) {
            ttl += lairURI + " hsq:apiendpoint " + "<" + $('#inp-api').val() + ">" + ".\r\n";
        }
        if ($("#inp-prefix").val().includes("http")) {
            ttl += lairURI + " hsq:prefix " + "<" + $('#inp-prefix').val() + ">" + ".\r\n";
        }
        if ($("#inp-link1").val().includes("http")) {
            ttl += lairURI + " hsq:link " + "<" + $('#inp-link1').val() + ">" + ".\r\n";
        }
        if ($("#inp-link2").val().includes("http")) {
            ttl += lairURI + " hsq:link " + "<" + $('#inp-link2').val() + ">" + ".\r\n";
        }
        if ($("#inp-link3").val().includes("http")) {
            ttl += lairURI + " hsq:link " + "<" + $('#inp-link3').val() + ">" + ".\r\n";
        }
        ttl += lairURI + " hsq:lairState " + "" + $("#sel-status option:selected").val() + "" + ".\r\n";
        ttl += lairURI + " hsq:hasLegalType " + "" + $("#sel-legaltype option:selected").val() + "" + ".\r\n";
        ttl += lairURI + " hsq:hasType " + "" + $("#sel-type option:selected").val() + "" + ".\r\n";
        ttl += lairURI + " hsq:hasQuality " + "" + $("#sel-quality option:selected").val() + "" + ".\r\n";
        if ($("#sel-group option:selected").val() != "-1") {
            ttl += lairURI + " hsq:lairGroup " + "" + $("#sel-group option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-language option:selected").val() != "-1") {
            ttl += lairURI + " hsq:language " + "" + $("#sel-language option:selected").val() + "" + ".\r\n";
        }
        $("#hiddenclipboard").val(ttl);
    }
};

// INIT
initModalCreateLair();
$("#alertdiv").hide();
$("#successdiv").hide();
$("#hiddenclipboard").hide();
