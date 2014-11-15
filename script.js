window.onload = function () {

        //Eerst normale variabelen, daarna de formules.
    var ans         = document.getElementById("antwoord"),
        is          = document.getElementById("is"),
        reset       = document.getElementById("c"),
        nummer      = document.querySelectorAll(".numberBtn"),
        operator    = document.querySelectorAll(".operatorBtn"),
        calcField   = "0",
        calcDisp    = "0",
        isPressed   = false,

            //Een event listener per knopje, dit is de magie.
        knop = function (input, aReset) {
            for (var i = 0; i < input.length; i++) {
                input[i].addEventListener('click', function () {
                    toField(this.textContent, aReset);
                });
            };
        },

            //Naar het tekstveld!
        toField = function (input, autoReset)
        {
            if ((autoReset && isPressed) || calcField === "0")
            {
                rst();
                calcDisp = "";
                calcField = "";
            };

            if (isPressed && calcField != "")
            {
                calcField = "(" + calcField + ")";
            };

            /*
            if (calcDisp.length != 0)
            {
                if (Boolean(calcDisp[calcDisp.length - 1].match(/[0-9]/)) == false)
                {
                    calcDisp += " " + input;
                };
            }
            else
            {
                calcDisp += input;
            };
            */

            calcDisp += input;

            calcField += input;
            ans.textContent = calcDisp;
            isPressed = false;
        },

             //Reset
        rst = function ()
        {
            calcField = "0";
            ans.textContent = calcField;
        },

            //Validatie en dan rekenen
        calculate = function ()
        {
            calcField = calcField.replace(/[.]{2,}/g, ".");

            if (
		        Boolean(calcField[0].match(/[*/]/g)) |
		        Boolean(calcField.match(/[+\-/*]{2,}/g)) |
		        Boolean(calcField.match(/[+\-/*][.]+[+\-/*]/g))
		        ) {
                ans.textContent="invalid";
                isPressed = true;
            }

            else
            {
                //calcField.replace(/^[^0-9+\-*/().]*$/, "");
                calcField = eval(calcField)
                if (parseFloat(calcField) > 999999 | parseFloat(calcField) < 0.000001)
                {
                    calcField = calcField.toPrecision(4);
                }
                else
                {
                    //Math.round(calcField[0] * Math.pow(10, calcfield.length)) / Math.pow(10, calcfield.length);

                    Math.round(calcField * 1e3) / 1e3;
                }
                calcDisp = calcField;
                ans.textContent = calcDisp;
                isPressed = true;
            };
        };

    
    //GAAN WE DAN
    //Heuuu!!
    knop(nummer, true);

    knop(operator, false);
    
    is.addEventListener('click', function ()
    {
        calculate();
    });

    reset.addEventListener('click', function ()
    {
        rst();
    });

};
