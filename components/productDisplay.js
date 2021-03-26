app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
/*html*/`
<div class="product-display">
<div class="product-container">
  <div class="product-image">
    <img v-bind:src="image">
    <!-- <a :href="url">Google.com </a> -->
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else>Out of Stock</p>
    <p :shipping >Shipping: {{ shipping}} </p>
    <ui>
      <li v-for="details in details"> {{details}}</li>
    </ui>
    <p>Variants</p>
    <!-- <div
       v-for="variant in variants"
        :key="variants.id"
         v-on:mouseover="imageHover(variant.image)"   
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
    </div> -->

    <div
    v-for="(variant,index) in variants"
     :key="variants.id"
      v-on:mouseover="updateVariant(index)"   
       class="color-circle"
       :style="{ backgroundColor: variant.color }">
 </div>
    

    <!-- <button class="button" type="button" v-on:click="cart++">Add to Cart</button> -->
    <button class="button"
    :class="{ disabledButton: !inStock }"
     :disabled="!inStock"
      v-on:click="addToCart">Add to Cart</button>
  </div>
</div>
<review-list v-if="reviews.length" :reviews="reviews"></review-list>
<review-form v-on:review-submited="addReview" ></review-form>
</div>
` ,
    data() {
        return {
            product: "Socks",
            description: `Best Socks Ever`,
            url: 'https://www.google.com/',
            //  image: './assets/pic1.PNG',
            selectedVariant: 0,
            // inStock: true,
            details: ['50% Cotton', '10% poliester', '40% candy'],
            variants: [
                { id: '123', color: 'Green', image: './assets/pic1.PNG', quantity: 50 },
                { id: '456', color: 'Red', image: './assets/pic2.PNG', quantity: 0 }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            // this.cart += 1
            this.$emit('add-to-cart');
        },
        imageHover(variantImage) {
            this.image = variantImage
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            // this.cart += 1
         this.reviews.push(review);
        }
    },
    computed: {
        title() {
            return 'Hot' + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if (this.premium) {
                return 'Free'
            }
            return '2.99'
        }

    }


});