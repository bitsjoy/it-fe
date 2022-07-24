import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios';
import React, { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE } from '../../apiConfig';
import ButtonPrimary from '../../components/Button';
import { bearer_token_key } from '../../localStorageConfig'; 

export default function VerifyOneTime() {
 
    let navigate = useNavigate();

    useEffect(() => {
        console.log(window.location.href.split("=")[1]);
        axios.post(API_BASE + '/api/user/setUserOwnedProducts', {
            email: localStorage.getItem('bitsjoy_email'),
            paymentId: window.location.href.split("=")[1],
            product: localStorage.getItem('payment_for_product'),
        },{ 
          headers : {
          'Authorization' : localStorage.getItem(bearer_token_key),
          'Content-Type': 'application/json'
      }}).then(res => {
        console.log(res);
            if(res.data.ownedProducts.includes("Notes")){ 
                document.getElementById("verifying").style.color = '#29AB87';
                document.getElementById("verifying").innerHTML = "Congratulations!<br/><br/> <img style='width: 40%' src='https://c.tenor.com/4blWuIh5MIYAAAAC/baby-yoda.gif' />";
               document.getElementById('make_notes').style.display = 'block';
               localStorage.removeItem('payment_for_product');
      
            } else { 
                 window.location.reload();
               localStorage.removeItem('payment_for_product');

            }
      }).catch((err) => {
        toast.error('err.response.message');
      })
    
      return () => {
      
      }
    }, [])
    
  return (
    <div align="center">
        <br/>
        <br/>
        <h2 style={{color: 'orange'}} id="verifying">Verifying payment <SyncOutlined spin/></h2>
        <br/>
        <div>
            {/* <h2 style={{color: 'orange'}}>Now you have the lifetime access to Notes</h2> */}
        <ButtonPrimary id="make_notes" styl={{display: 'none'}} text="Make Notes" onClick={() => {
            navigate('/notes');
        }} />
        </div>
    </div>
  )
}
