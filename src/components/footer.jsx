import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css files/footer.css";
import { faGithubSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../functions/supabaseClient";
export default function Footern(){

const update=async()=>{
    try{
//    const {data,error}=await supabase.from("shoes").select(`*`);
//    if(error) throw error;
//    console.log(data);
//    const d=data;
//    d.forEach((ele)=>{
//        ele.shoecolors.forEach((ele2)=>{
//          ele.shoeimages[ele2]=ele.shoeimages[ele2].map((ele3)=>{
//                return ele3.replace("https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o","").replace(/%2F/g,"/").slice(0,-53).replace(/%20/g," ");
//            });
//        })
//    })

const {data,error} = await supabase.from("Orders").select('*');
if(error) throw error;
console.log(data);
const d=data;
d.forEach((ele)=>{
    ele.shoeDetails.forEach((ele2)=>{
        ele2.shoes.shoecolors.forEach((ele3)=>{
            ele2.shoes.shoeimages[ele3]=ele2.shoes.shoeimages[ele3].map((ele4)=>{
               return ele4.replace("https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o","").replace(/%2F/g,"/").slice(0,-53).replace(/%20/g," ");

            })
        })
    })
})
console.log(d)
// d[0].nike.shoes.map((ele)=>{
//     ele.shoecolors.forEach((ele2)=>{
//      ele.shoeimages[ele2]=ele.shoeimages[ele2].map((ele3)=>{
//                return ele3.replace("https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o","").replace(/%2F/g,"/").slice(0,-53).replace(/%20/g," ");
//         })
//     })
// })
// d[0].puma.shoes.map((ele)=>{
//     ele.shoecolors.forEach((ele2)=>{
//      ele.shoeimages[ele2]=ele.shoeimages[ele2].map((ele3)=>{
//                return ele3.replace("https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o","").replace(/%2F/g,"/").slice(0,-53).replace(/%20/g," ");
//         })
//     })
// })
// d[0].skechers.shoes.map((ele)=>{
//     ele.shoecolors.forEach((ele2)=>{
//      ele.shoeimages[ele2]=ele.shoeimages[ele2].map((ele3)=>{
//                return ele3.replace("https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o","").replace(/%2F/g,"/").slice(0,-53).replace(/%20/g," ");
//         })
//     })
// })
//    console.log(d)
   {
       const {data,error}=await supabase.from("Orders").upsert(
      d.map((ele)=>{
          return {
              id:ele.id,
              shoeDetails:ele.shoeDetails
          }
      })
         );
           if(error) throw error;
           console.log(data);
       
   }
}catch(err){
    console.log(err)
}



}

    return <div>
        <div className="foot">
            <div className="points">
                {/* <button onClick={update}>click</button> */}
              <a href="https://github.com/SwasthikJP/Shoestore-web" rel="noreferrer" target="_blank">About Shoe store</a>
              <a href="https://github.com/SwasthikJP/Shoestore-web" rel="noreferrer" target="_blank">Help</a>
            </div>
            <div className="points">
            <a target="_blank" rel="noreferrer" href="https://www.nike.com/in">About Nike</a>
            <a target="_blank" rel="noreferrer" href="https://in.puma.com/">About Puma</a>
            <a target="_blank" rel="noreferrer" href="https://www.skechers.in/">About Skechers</a>
            </div>
            <div className="allLinks"  >
                <a rel="noreferrer" href="https://github.com/swasthikjp" target="_blank"><FontAwesomeIcon color="white" size="2x" icon={faGithubSquare}/></a>
                <a rel="noreferrer" href="https://twitter.com/swasthikjp" target="_blank"><FontAwesomeIcon  color="white"  size="2x" icon={faTwitterSquare}/></a>
                <a rel="noreferrer" href="https://www.instagram.com/swasthikjpgowda/" target="_blank" ><FontAwesomeIcon color="white"   size="2x" icon={faInstagramSquare}/></a>
            </div>
        </div>
    </div>
}