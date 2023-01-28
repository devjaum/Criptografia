class AES{
    constructor(){
        this.value = "";
        this.key = [];
        this.buttonEncrypt = document.getElementById("buttonEncrypt");
        this.buttonDecrypt = document.getElementById("buttonDecrypt");
        this.h2Encrypt = document.getElementById("encrypt");
        this.keyHud = document.getElementById("keyHud");
        this.keyInput = document.getElementById("keyInput");
        this.value = document.getElementById("entry").value;

        this.buttonEncrypt.addEventListener('click',()=>{
            this.key = [];
            this.encrypt(this);
            this.h2Encrypt.innerText = "";
            this.keyInput.value = "";
        });
        this.buttonDecrypt.addEventListener('click',()=>{
            this.decrypt(this);
            this.key = [];
            this.keyHud.innerText = "";
            try {
                this.value.value = "";
            } catch (error) {
                ;
            }
            
        });

    }
    encrypt(){
        this.value = document.getElementById("entry").value;
        let value = this.matriz(this.value,false); 
        value = value.join("");
        this.keyHud.addEventListener("click",()=>this.copyKey(this.key));
        let _keyHud = "KEY: "+this.key;
        this.keyHud.innerText = _keyHud;
    }
    decrypt(){
        let _key = this.keyInput.value;
        if(_key == "") return alert("Insira uma chave");
        _key = _key.split(",");
        if(_key[0].length < 4) alert("Key está invalida");
        _key.forEach((e,i)=>{
            if(!isNaN(e)) _key[i] = e;
            else return alert("Key está invalida!");
        })
        this.key = _key;
        let value = this.matriz("0123456789012345",true); 
        value = value.join("");
        this.h2Encrypt.innerText = value;
    }
    shuffling(valueAscii, limit){
        const max = 126+48*2;
        let x = (48*(limit+1))*(valueAscii);
        let newValue = x/(48*(limit+1)+valueAscii+max);
        if(newValue+48 > 126) newValue = newValue-(newValue/2);
        else newValue = newValue+126-(newValue*2);
        this.key.push(x);
        return Math.ceil(newValue);
    }
    unscramble(limit){
        const max = 126+48*2;
        const _limit = 48 * (limit+1);
        const _key = this.key[limit];
        const _decrypt = _key/_limit;
        if(isNaN(_decrypt)) return 0;
        if(_decrypt > 126 || _decrypt < 1) {
            alert("KEY invalida!"); 
            return 0;
        }
        return _decrypt;
    }
    matriz(value,decrypt){
        let _matriz = []
        const TAM = value.length;
        for(let i = 0; i < TAM; i++) _matriz.push(this.asciiGenerator(value[i]));
        
        _matriz.forEach((e,i)=>{
            if(!decrypt) _matriz[i] = String.fromCodePoint(this.shuffling(e,i));
            else {
                let x = this.unscramble(i);
                if(x == 0) return;
                else _matriz[i] = String.fromCodePoint(x);
            };
        })
        if(!decrypt){
            return _matriz;
        }
        let decryptMatriz = []
        _matriz.forEach((e,i)=>{
            if((typeof _matriz[i] == "number") || _matriz[i] === undefined) {
                return;
            }else decryptMatriz.push(e);
        })
        return decryptMatriz;
    }
    asciiGenerator(char){
        return char.charCodeAt(0);
    }
    copyKey(key){
        const password = key;      
        navigator.clipboard.writeText(password).then(()=>{
            alert("KEY copiada");
        });
    }
}
const Aes = new AES();
