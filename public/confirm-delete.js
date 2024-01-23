
function confirmdelete(id){
    const result=confirm('Are sure you want to delete this product?');

    if(result){
        fetch('/delete-product/'+id,{
            method:'POST'
        }).then((res)=>{
            if(res.ok){
             location.reload();
            }
        });
    }
}