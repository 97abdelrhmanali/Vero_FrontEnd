<template>
    <div class="d-flex justify-content-center align-items-center p-5">
        <div class="container">
            <div class="row">
            <div class="col-md-2 d-flex justify-content-center align-items-center p-5">
                <div class="container">
                    <img class="d-block w-50 my-3" src="../assets/refresh/images (1).png" alt="">
                    <img class="d-block w-50 mb-5" src="../assets/refresh/images.png" alt="">
                    <img class="d-block w-50 my-5" src="../assets/refresh/images (2).png" alt="">
                </div>
            </div>
            <div class="col-md-10 d-flex">
                <div class="w-75 d-flex justify-content-center align-items-center">
                    <div class="container">
                        <div class="background px-3 pb-3">
                            <div id="workspace" class="container row bg-light" ref="printMe">
                                <div class="col-md-3 bg-light" v-for="(item,index) in items" :key="index" >
                                    <img width="150px" height="150px" :src="item" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="d-flex">
                            <img width="60px" class="mx-3" src="../assets/arrows/Up.png" alt="">
                            <img width="60px" class="mx-3" src="../assets/arrows/down.png" alt="">
                            <img width="60px" class="mx-3" src="../assets/arrows/left.png" alt="">
                            <img width="60px" class="mx-3" src="../assets/arrows/right.png" alt="">
                        </div>
                    </div>
                </div>
                <div>
                    <form action="" enctype="multipart/form-data">
                        <label class="d-block btn btn-danger rounded-5 w-50">
                            <input type="file" accept="image/*" @change="previewFiles" name="image" id="image" style="display:none;"/>
                            <p class="h6">1</p>
                            <img class="w-50" src="../assets/icons/image-removebg-preview.png" alt="">
                        </label>
                        <label class="d-block btn btn-success rounded-5 w-50">
                            <input type="file" name="image" id="image"  style="display:none;" />
                            <p class="h6">2</p>
                            <img class="w-50" src="../assets/icons/background-removebg-preview.png" alt="">
                        </label>
                        <label class="d-block btn btn-primary rounded-5 w-50">
                            <p class="h6">3</p>
                            <img class="w-50" src="../assets/icons/download-removebg-preview.png" alt="">
                        </label>
                        <label class="d-block btn btn-warning rounded-5 w-50">
                            <p class="h6">4</p>
                            <img class="w-50" src="../assets/icons/camera-removebg-preview.png" alt="">
                        </label>
                    </form>
                </div>
            </div>
        </div>
        <button @click="print"  class="btn btn-primary my-3 d-block m-auto">Upload Activity</button>
        <button class="btn btn-light my-3">Back To course</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import html2canvas from 'html2canvas';

export default{
    name:"AddBook",
    data(){
        return{
            image:'',
            items:[],
            output: null
        };
    },

    // computed(){
    //     console.log(this.image)
    // },

    // beforeUpdate(){
    //     console.log(this.image)
    // },

    methods:{
        dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while(n--){
        u8arr[n] = bstr.charCodeAt(n);
        }
    return new File([u8arr], filename, {type:mime});
    },





        async print() {


            var screen = document.getElementById("workspace")
            await html2canvas(screen).then((canvas)=>{
                const baseurl = canvas.toDataURL("image/png");
                var fileData = this.dataURLtoFile(baseurl, "imageName.jpg");
                this.output = fileData
                //console.log("Here is JavaScript File Object",fileData)
                    //fileArr.push(fileData)
                
            });
            console.log(this.output)
            try {
                await axios.post("http://127.0.0.1:8000/api/image",
                {
                    image:this.output
                });
                console.log("sss")
            } catch (error) {
                console.log(error);
            }
        },

        async previewFiles(event) {
            var reader = new FileReader();
            reader.addEventListener('load',()=>{
                this.image = reader.result;
                this.items.push(this.image)
                this.items.forEach(element => {
                    console.log("items")
                    console.log(element)
                });
            })
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}    


</script>


<style>
.background{
    background-image: linear-gradient(to right,blue , green,yellow,orange, red);
}
</style>