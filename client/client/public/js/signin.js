const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// check form

const formAdmin = document.querySelector(".form__admin");
const formDriver = document.querySelector(".form__driver");
const formCustomer = document.querySelector(".form__customer");
document.addEventListener("input", (e)=>{
    if(e.target.getAttribute('name') == 'selector'){
        switch(e.target.value){
            case "driver":
                formDriver.classList.add('show');
                formAdmin.classList.add('hidden');
                formCustomer.classList.add('hidden');

                formDriver.classList.remove('hidden');
                formAdmin.classList.remove('show');
                formCustomer.classList.remove('show');
            break;
            case "customer":
                formDriver.classList.add('hidden');
                formAdmin.classList.add('hidden');
                formCustomer.classList.add('show');

                formDriver.classList.remove('show');
                formAdmin.classList.remove('show');
                formCustomer.classList.remove('hidden');
            break;
            default:
                formDriver.classList.add('hidden');
                formAdmin.classList.add('show');
                formCustomer.classList.add('hidden');

                formDriver.classList.remove('show');
                formAdmin.classList.remove('hidden');
                formCustomer.classList.remove('show');
            break;
        }
        
        console.log(e.target.value);
    }
})