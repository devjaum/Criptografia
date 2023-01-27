class AES{
    constructor(){
        this.value = "";

        this.buttonEncrypt = document.getElementById("buttonEncrypt");

        this.buttonEncrypt.addEventListener('click',this.encrypt.bind(this))

    }
    encrypt(){
        this.value = document.getElementById("entry").value;
        
    }
    decrypt(){

    }
}
const Aes = new AES();
