
window.onload = function () {

    var ans         = document.getElementById("antwoord"),
        is          = document.getElementById("is"),
        reset       = document.getElementById("c"),
        nummer      = document.querySelectorAll(".numberBtn"),
        operator    = document.querySelectorAll(".operatorBtn"),
        calcField   = "0",
        isPressed   = false,
        ForEach     = function (list, callback) {
            Array.prototype.forEach.call(list, callback);
        },

            //reset
        rst = function () {
            calcField = "0";
            ans.textContent = calcField;
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
            ans.textContent = calcField;
            isPressed = false;
        },

            //klik detectie en doorgeef functionaliteit
/*        Knop = function (element, autoReset) {
            ForEach(element, function (el) {
                el.addEventListener('click', function () {
                    toField(element.textContent, autoReset);
                })
            })
        },
*/
            //Validatie en dan rekenen
        calculate = function () {
            calcField = calcField.replace(/[.]{2,}/g, ".");

            if (
		        Boolean(calcField[0].match(/[*/]/g)) |
		        Boolean(calcField.match(/[+\-/*]{2,}/g)) |
		        Boolean(calcField.match(/[+\-/*][.]+[+\-/*]/g))
		        ) {
                ans.textContent="invalid";
                isPressed = true;
            }

            else {
                calcField = calcField.replace(/[^-()\d/*+.]/g, '');
                calcField = Math.round(eval(calcField) * 1e3) / 1e3;
                ans.textContent=calcField;
                isPressed = true;
            };
        };

/*
    for (var i in nummer) {
        nummer[i].onclick = toField(nummer[i].innerHTML,true)
    };
    
    

    toField(this.innerHTML, true)

    
    is.onclick = alert('1');
    reset.onclick = rst();
    calculate();

    


     ForEach(nummer, addEventListener('click', function () {
        toField(this.textContent, true)
    }));


    for (var i = 0; i < nummer.length; i++) {
        iter = nummer[i]
        iter.addEventListener('click', function () {
            toField(this.textContent, true);
        });
    };

    for (var i = 0; i < operator.length; i++) {
        iter = operator[i]
        iter.addEventListener('click', function () {
            toField(this.textContent, true);
        });
    };

*/

    knop = function (input, aReset) {
        for (var i = 0; i < input.length; i++) {
            input[i].addEventListener('click', function () {
                toField(this.textContent, aReset);
            });
        };
    }

    knop(nummer, true);
    knop(operator, false);
    

    

       
    is.addEventListener('click', function () {
        calculate();
    });

    reset.addEventListener('click', function () {
        rst();
    });

/*  
    is.addEventListener('click', function () {
        calculate();
    });

    
    
    
    Knop(nummer, true);

    Knop(operator, false)
*/
};
