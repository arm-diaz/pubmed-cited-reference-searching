import React, { useEffect } from 'react';

import './ArticleFind.css';
import {ExportToExcel} from './ExportToExcel'


export interface ApiObject {
    PubMedID: string | undefined
}

const ArticleFind: React.FC = () => {
    const [id1, setID1] = React.useState<string>("")
    const [id2, setID2] = React.useState<string>("")
    const [fileName, setFileName] = React.useState<string>("")
    //const [data, setData] = React.useState<ApiObject>({PubMedID : ""})

    const [apiList, setAPI1List] = React.useState<ApiObject[]>([]);

    const api1 = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_citedin&id="
    const api2 = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_refs&id="

    
    const getData = (id: string | undefined, url: string, fileName: string) => {
        //const id = 21876726, 21645191;
        setFileName(fileName);

        if (id !== ""){

        const request = `${url}${id}`
        console.log("request", request)

        // 1. Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configure it: GET-request for the URL /article/.../load
        xhr.open('GET', request);
        //xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //xhr.setRequestHeader("X-PINGOTHER", "pingpong");
        //xhr.setRequestHeader("Content-Type", "text/xml");

        //xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', '"Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"');
        //xhr.setRequestHeader("Content-Type", "text/xml");

        // 3. Send the request over the network
        xhr.send();

        // 4. This will be called after the response is received
        xhr.onload = function() {
        if (xhr.status !== 200) { // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            //setData(xhr.response);
            //console.log('request', xhr.response)

            console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
        }
        };

        xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            console.log(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
            console.log(`Received ${event.loaded} bytes`); // no Content-Length
        }

        };

        xhr.onerror = function() {
            console.log("Request failed");
        };

        xhr.onreadystatechange = function() {
            if (xhr.status !== 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                // console.log('response', xhr.response)
                console.log('------------> begin')
                let xmlDoc  = xhr.responseXML;
                if (xmlDoc !== null){
                    console.log('xmlDoc', xmlDoc)
                    let x = xmlDoc.getElementsByTagName("Id");

                    // console.log('xmlDocx', x)

                    const xLen : number = x.length;
                    const data : [ApiObject] | any[] = [];

                    for (let i = 0; i < xLen; i++) {
                        const value = x[i].childNodes[0].nodeValue;
                        if (value !== null)
                        {
                            data.push({PubMedID: value});
                        }
                        
                    }
                    setAPI1List(data)
                    //let y = x.textContent;
                    // setData(tmp);
                } else {
                    setAPI1List([]);
                }
                // console.log('ready', xhr.response)
                // console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
                console.log('------------> end')
            }
            };

        //console.log('request2', xhr.onload)


        } else {
            setAPI1List([]);
        }

    }

      //useEffect( () => { getData() },[])     
      
    //   console.log("last data", data)

    /*
                <img
            src={"logo192.png"}
            alt="Info"
            style={{
                display:"flex",
                position:"relative",
              width: 20,
              backgroundColor: "white",
              verticalAlign: "center",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        */


    return (
        <div>
            <div className='title'>
          
            <h1>Cited Reference Searching</h1>
            </div>
            <div>  

            <div className="App">
                
            </div>

            <div className="input__wrapper"> 
                <h3>Articles that cite a given article</h3>
                <br />
                <input id="api1" type="text" placeholder="Search PMID" value={id1} onChange={e => setID1(e.target.value)}/>
                <button id="1" onClick={event => getData(id1, api1, `${id1}_articles_citedby`)}>Search</button>
                <br />
                <br />

                <ExportToExcel apiData={apiList} fileName={fileName}/>

                <h3>Articles that a given article cites</h3>
                <br />
                <input id="api2" type="text" placeholder="Search PMID" value={id2} onChange={e => setID2(e.target.value)}/>
                <button id="2" onClick={event2 => getData(id2, api2, `{id1}_article_cites`)}>Search</button>
                
            </div>

            </div>
            <div className="body">
                    {apiList && apiList?.length === 0 && (
                    <div className="notFound">No data Found</div>
                    )}

                    {apiList &&
                    apiList?.length > 0 &&
                    apiList?.map((data) => {
                        
                        return (
                        <div className="body__item" key={data?.PubMedID}>
                            <p>PubMedID: {data?.PubMedID}</p>
                        </div>
                        );
                    })}
                </div>
        </div>
    );
}

export default ArticleFind;