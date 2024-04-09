
// Mehsul shekili ve melumatlandirma
let product=document.createElement('div');
product.classList.add('product');
document.body.append(product);

// Shekilin yerlesdiyi div
let slidebar=document.createElement('div');
slidebar.classList.add('slidebar');
product.append(slidebar);

let slide_img=document.createElement('img');

// sag ox
let right=document.createElement('i');

right.classList.add('fa-solid','fa-chevron-right','right');

// sol ox
let left=document.createElement('i');

left.classList.add('fa-solid', 'fa-chevron-left','left');

// shekil sira nomresi
let number=document.createElement('p');
number.classList.add('number');

slidebar.append(slide_img,left,right,number);

// mehsul melumatlandirma hissesi
let details=document.createElement('div');
details.classList.add('details');
product.append(details);

// melumatlandirma hisse mehsul ad_qiymet
let name_price=document.createElement('div');
name_price.classList.add('name_price');

//melumatlandirma ad
let name=document.createElement('p');
name.classList.add('name');

// qiymet
let price=document.createElement('p');
price.classList.add('price');

name_price.append(name,price);

//Sebete elave et buton icon
let btn_icon=document.createElement('i');
btn_icon.classList.add('fa-solid','fa-download','down')

//Sebete elave et button
let btn_all=document.createElement('button');
btn_all.classList.add('btn_all');
btn_all.textContent='Səbətə əlavə et';
btn_all.prepend(btn_icon);
details.append(name_price,btn_all);

//Api deyerini alma
let data=[];

//data indeks
let n=1;


   right.addEventListener('click',()=>{
        
        n==data.length-1?n=0:n++;

        slide_img.src=data[n].image;

        name.textContent=data[n].title;

        price.textContent=`Qiymət: ${data[n].price}$`;

        number.textContent=(n+1)+'/'+(data.length);


    
    })
   left.addEventListener('click',()=>{
        
        n==0?n=data.length-1:n--;

        slide_img.src=data[n].image;

        name.textContent=data[n].title;

        price.textContent=`Qiymət: ${data[n].price}$`;

        number.textContent=(n+1)+'/'+(data.length);
    })


//Api deyer alma
fetch('https://fakestoreapi.com/products')
.then((res)=>res.json())
.then((resData)=>
{data=resData
left.click()});


//Ashagi alma hissesi 
let piece=0;
let total=0;

//Umumi div - .pay
let pay=document.createElement('div');
pay.classList.add('pay');


//Alinma sayi
let pay_piece=document.createElement('div');
pay_piece.classList.add("pay_piece");

//toplam alinan qiymeti
let pay_total=document.createElement('div');
pay_total.classList.add("pay_total");


//reset buton
let reset_pay=document.createElement('button');
reset_pay.classList.add('reset_pay');
reset_pay.textContent='Reset';


//Almaq buton
let btn_pay=document.createElement('button');
btn_pay.classList.add("btn_pay");
btn_pay.textContent='Ödəniş et';
pay.append(pay_piece,pay_total,btn_pay,reset_pay);
document.body.append(pay);

//pay daxili yazilar
pay_piece.textContent=(`Say: ${piece}`);
pay_total.textContent=(`Toplam: ${total}$`);


//Gorunmez alinanlar listi
let products_received=document.createElement('div');
products_received.classList.add('products_received');

//list acma-baglama icon
let received_top=document.createElement('i');
received_top.classList.add('fa-solid','fa-sort-up','received_top');

//Melumatlarin oldugu hisse
let received_details=document.createElement('p');
received_details.textContent=`Seçilən məhsullar :`;
received_details.classList.add('received_details')

let received_ul=document.createElement('ul');

//ad  qiymet yazisi ilk li
let received_li_head=document.createElement('li');
received_li_head.classList.add('received_li_head')

let li_name=document.createElement('p');
li_name.textContent="Ad:";

let li_price=document.createElement('p');
li_price.textContent='Qiymet:';



received_li_head.append(li_name,li_price);
received_ul.prepend(received_li_head);


products_received.append(received_details,received_ul);
document.body.append(received_top,products_received);

//Secilen mehsulu gorunmez Secilenler listine elave etmek

btn_all.addEventListener('click',()=>
{
    
//Secilen mehsulun elave olundugu li
    let received_li=document.createElement('li');
    received_li.classList.add('received_li');
    received_li.setAttribute('title',`${data[n].title}`);

// Mehsul legv icon X
    let xmark=document.createElement('i');
    xmark.classList.add("fa-solid", "fa-xmark",'xmark');

// secilenler listinden legv ve alinma hisse say ve qiymet(toplam) deyisimi

    xmark.addEventListener('click',()=>{
        received_li.remove();
        piece=received_ul.children.length-1;
        total-=data[n].price;

        pay_piece.textContent=(`Say: ${piece}`);
        pay_total.textContent=(`Toplam: ${(total.toFixed(2))}$`);
    })

    //Daxil olunan mehsulun ad ve qiymet alma ... substring ad uzunlugunun qarsisini almaq ucundur ..

    let name=document.createElement('p');
    name.textContent=data[n].title;
    name.textContent=`${name.textContent.substring(0,18)}...`;
    name.classList.add('rec_name');

    let price=document.createElement('p');
    price.textContent=`${data[n].price}$`;
    price.classList.add('rec_price');
    

    
received_li.append(name,price,xmark);
received_ul.append(received_li);


// xmark() edilmedikde   alinma hissede gorunen say ve toplam qiymet

piece=received_ul.children.length-1;
total+=data[n].price;
pay_piece.textContent=(`Say: ${piece}`);
pay_total.textContent=(`Toplam: ${(total.toFixed(2))}$`);


})


//Resetleme
reset_pay.addEventListener('click',()=>
{
    piece=0;
    total=0;
    pay_piece.textContent=(`Say: ${piece}`);
    pay_total.textContent=(`Toplam: ${Math.trunc(total)}$`);
    received_ul.innerHTML='';
})


//Secilenler listesini gorunur etme ve tersi

let top_true=true;

received_top.addEventListener('click',()=>{
    if(top_true){
    received_top.style.transform='scaleY(-1)';
    
    products_received.style.bottom='55px';
    products_received.style.height='auto';
    products_received.style.visibility='visible';
 
    top_true=false;
}
else{
    received_top.style.transform='scaleY(1)';

    products_received.style.bottom='10px';
    products_received.style.height='0px';
    products_received.style.visibility='hidden';
    top_true=true;
}
})





