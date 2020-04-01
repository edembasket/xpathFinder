document.addEventListener('click',(e)=>generationElement(e.target));

function getElementByXpath(path) {
    
    return document.evaluate(path, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function generationElement(element) {
   
    console.log(element);
   if(element.textContent.trim() != "" && element.tagName)
   {
       var elementType = element.tagName.toLowerCase();
       var textContent = element.textContent.trim();
       var path = "//" + elementType + "[contains(text(),normalize-space('"+textContent+"'))]";
       if(getElementByXpath(path)!= null)
       {console.log(path);}
       else
       { 
           console.log("Finding child element");
           childContextElement(element)
    }
   }
   else{
    console.log(" tagname ve content yok");
    contextElementFind(element);
   }
}

function contextElementFind(element){
   element = getPreviousSibling(element);
   generationElement(element);
}



function getPreviousSibling(element){
    var sibling = element.parentNode;
    while (sibling.textContent.trim() === "") {
        sibling = sibling.parentNode;
    }
    return sibling;
}

function childContextElement(element){
    var childElement = element.children;
    if(childElement.length>0){
        for (let i = 0; i < childElement.length; i++) {
            if(childElement[i].textContent.trim()!="")
            generationElement(childElement[i]);
            
        }
    }
}