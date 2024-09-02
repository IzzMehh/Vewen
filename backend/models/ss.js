const d = Date.now()

const p = 1516239022 * 1000

if(p>d){
    console.log('auth is ok')
}else{
    console.log("auth expired")
}