import { Grid } from "lucide-react";


function Slide({content}) {

    return (
<>
<div style={{gridColumn: "1 / -1", alignContent: "center"}}>
        {content}
</div>
</>        
    )
}

export default Slide;