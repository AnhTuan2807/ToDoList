function Validation() {
    this.CheckValid = function(idInput, err, mess) {
        if (getEle(idInput).value === "") {
            getEle(err).innerHTML = mess;
            getEle(err).style.display = "block";
            return false;
        } else {
            getEle(err).style.display = "none";
            return true;
        }

    };
    this.CheckDupli = function(idInput, err, mess, arr) {
        var Dupli = false;
        Dupli = arr.some(function(item) {
            return item.name === getEle(idInput).value;
        });
        if (Dupli) {
            getEle(err).innerHTML = mess;
            getEle(err).style.display = "block";
            return true;
        } else {
            getEle(err).style.display = "none";
            return false;

        }
    };
}