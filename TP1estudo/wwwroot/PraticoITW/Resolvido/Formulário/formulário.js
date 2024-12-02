var nome = document.getElementById("fld_1");
var alga = document.getElementById("field_30");
var msf = document.getElementById("field_31");
var c = document.getElementById("field_32");
var itw = document.getElementById("field_33");
var fp = document.getElementById("field_34");
var mas = document.getElementById("field_35");
var c2 = document.getElementById("field_36");
var md = document.getElementById("field_37");
var iac = document.getElementById("field_38");
var poo = document.getElementById("field_39");

function enviar() {
    var retVal = true;

    var nome = document.getElementById("fld_1");
    var nomeArray = nome.value.split(" ");
    var nomeErro = document.getElementById("fld_1_Error");
    if (nomeArray.length < 2) {
        retVal = false;

        nomeErro.classList.add("d-block");
        nomeErro.classList.remove("d-none");
    }

    var alga = document.getElementById("field_30").value;
    var algaErro = document.getElementById("field_30_Error");
    if (alga == "" || alga < 0 || alga > 20) {
        retVal = false;

        algaErro.classList.add("d-block");
        algaErro.classList.remove("d-none");
    }
    else {
        algaErro.classList.remove("d-block");
        algaErro.classList.add("d-none");
    }

    var msf = document.getElementById("field_31").value;
    var msfErro = document.getElementById("field_31_Error");
    if (msf == "" || msf < 0 || msf > 20) {
        retVal = false;

        msfErro.classList.add("d-block");
        msfErro.classList.remove("d-none");
    }
    else {
        msfErro.classList.remove("d-block");
        msfErro.classList.add("d-none");
    }


    var c = document.getElementById("field_32").value;
    var cErro = document.getElementById("field_32_Error");
    if (c == "" || c < 0 || c > 20) {
        retVal = false;

        cErro.classList.add("d-block");
        cErro.classList.remove("d-none");
    }
    else {
        cErro.classList.remove("d-block");
        cErro.classList.add("d-none");
    }


    var itw = document.getElementById("field_33").value;
    var itwErro = document.getElementById("field_33_Error");
    if (itw == "" || itw < 0 || itw > 20) {
        retVal = false;

        itwErro.classList.add("d-block");
        itwErro.classList.remove("d-none");
    }
    else {
        itwErro.classList.remove("d-block");
        itwErro.classList.add("d-none");
    }


    var fp = document.getElementById("field_34").value;
    var fpErro = document.getElementById("field_34_Error");
    if (fp == "" || fp < 0 || fp > 20) {
        retVal = false;

        fpErro.classList.add("d-block");
        fpErro.classList.remove("d-none");
    }
    else {
        fpErro.classList.remove("d-block");
        fpErro.classList.add("d-none");
    }

    var mas = document.getElementById("field_35").value;
    var masErro = document.getElementById("field_35_Error");
    if (mas == "" || mas< 0 || mas > 20) {
        retVal = false;

        masErro.classList.add("d-block");
        masErro.classList.remove("d-none");
    }
    else {
        masErro.classList.remove("d-block");
        masErro.classList.add("d-none");
    }
    var c2 = document.getElementById("field_36").value;
    var c2Erro = document.getElementById("field_36_Error");
    if (c2 == "" || c2 < 0 || c2 > 20) {
        retVal = false;

        c2Erro.classList.add("d-block");
        c2Erro.classList.remove("d-none");
    }
    else {
        c2Erro.classList.remove("d-block");
        c2Erro.classList.add("d-none");
    }
    var md = document.getElementById("field_37").value;
    var mdErro = document.getElementById("field_37_Error");
    if (md == "" || md < 0 || md > 20) {
        retVal = false;

        mdErro.classList.add("d-block");
        mdErro.classList.remove("d-none");
    }
    else {
        mdErro.classList.remove("d-block");
        mdErro.classList.add("d-none");
    }
    var iac = document.getElementById("field_38").value;
    var iacErro = document.getElementById("field_38_Error");
    if (iac == "" || iac < 0 || iac > 20) {
        retVal = false;

        iacErro.classList.add("d-block");
        iacErro.classList.remove("d-none");
    }
    else {
        iacErro.classList.remove("d-block");
        iacErro.classList.add("d-none");
    }
    var poo = document.getElementById("field_39").value;
    var pooErro = document.getElementById("field_39_Error");
    if (poo == "" || poo < 0 || poo > 20) {
        retVal = false;

        pooErro.classList.add("d-block");
        pooErro.classList.remove("d-none");
    }
    else {
        pooErro.classList.remove("d-block");
        pooErro.classList.add("d-none");
    }

    return retVal

}

//--- Limpar as mesagens de erro que estiverem ligadas
function limpar() {
    nome = "";
    alga = "";
    msf = "";
    c = "";
    itw = "";
    fp = "";
    mas = "";
    c2 = "";
    matd = "";
    iac = "";
    poo = "";
    med1 = "";
    med2 = "";
    medt = "";

}