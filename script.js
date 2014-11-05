
window.onload = function () {

    var ans = document.getElementById("antwoord"),
        is = document.getElementById("is"),
        reset = document.getElementById("c"),
        nummer = document.querySelectorAll(".numberBtn"),
        operator = document.querySelectorAll(".operatorBtn"),
        calcField = "0",
        isPressed = false,
        ForEach = function (list, callback) {
            Array.prototype.forEach.call(list, callback);
        },

            //reset
        rst = function () {
            calcField = "0";
            ans.textContent(calcField);
        },

            //naar het tekstveld!
        toField = function (input, autoReset) {
            if (calcField === "0") {
                calcField = "";
            }
            else if (autoReset && isPressed) {
                rst();
                calcField = ""
            }
            calcField += input;
            ans.textContent.replace(calcField);
            isPressed = false;
        },

            //klik detectie en doorgeef functionaliteit
        Knop = function (element, autoReset) {
            ForEach(element, function (el) {
                el.addEventListener('click', function () {
                    toField(element.textContent, autoReset);
                })
            })
        },
            //Validatie en dan rekenen
        calculate = function () {
            this.calcField = this.calcField.replace(/[.]{2,}/g, ".");

            if (
		        Boolean(this.calcField[0].match(/[*/]/g)) |
		        Boolean(this.calcField.match(/[+\-/*]{2,}/g)) |
		        Boolean(this.calcField.match(/[+\-/*][.]+[+\-/*]/g))
		        ) {
                this.ans.textContent("invalid");
                this.isPressed = true;
            }

            else {
                this.calcField = this.calcField.replace(/[^-()\d/*+.]/g, '');
                this.calcField = Math.round(eval(this.calcField) * 1e3) / 1e3;
                this.ans.textContent(this.calcField);
                this.isPressed = true;
            };
        };


    ForEach(nummer, function (n) {
        n.addEventListener('click', function () {
            toField(nummer.textContent, true)
        })
    });



    is.addEventListener('click', function () {
        calculate();
    });

    reset.addEventListener('click', function () {
        rst();
    });
    
    /*
    Knop(nummer, true);

    Knop(operator, false)
    */
};
