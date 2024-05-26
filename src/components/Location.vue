<template>
    <div>
        Location <input type="checkbox" v-model="location.checked" label="Active location"
            @click="onLocationCheck" />localisation
    </div>
</template>

<script>
export default {
    name: "Location",
    data() {
        return {
            location: {
                checked: false
            }
        }
    },
    methods: {


        // watchPos(){
        //     var id, target, options;

        // function success(pos) {
        //   var crd = pos.coords;

        //   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        //     console.log("Bravo, vous avez atteint la cible");
        //     navigator.geolocation.clearWatch(id);
        //   }
        // }



        // target = {
        //   latitude: 0,
        //   longitude: 0,
        // };

        // options = {
        //   enableHighAccuracy: false,
        //   timeout: 10000,
        //   maximumAge: 0,
        // };

        // id = navigator.geolocation.watchPosition(success, error, options);

        // },
        async posSuccess(pos) {
            let store = this.$store
            var crd = pos.coords;

            console.log("Votre position actuelle est :");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude : ${crd.longitude}`);
            console.log(`La précision est de ${crd.accuracy} mètres.`);

            let location = { latitude: crd.latitude, longitude: crd.longitude }
            store.dispatch('locations/saveLocation', location)


            // const { error } = await supabase.from('restaurants').insert([
            //     {
            //         name: 'Supa Burger',
            //         location: 'POINT(-73.946823 40.807416)',
            //     },
            //     {
            //         name: 'Supa Pizza',
            //         location: 'POINT(-73.94581 40.807475)',
            //     },
            //     {
            //         name: 'Supa Taco',
            //         location: 'POINT(-73.945826 40.80629)',
            //     },
            // ])


        },
        posError(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
        },
        onLocationCheck() {
            // this.watchPos()

            console.log(this.location.checked)
            // checkbox inversé
            if (!this.location.checked) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                };



                navigator.geolocation.getCurrentPosition(this.posSuccess, this.posError, options); 

                // var id, target, options;

                // function success(pos) {
                //     var crd = pos.coords;

                //     if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
                //         console.log("Bravo, vous avez atteint la cible");
                //         navigator.geolocation.clearWatch(id);
                //     }
                // }

                // function error(err) {
                //     console.warn("ERROR(" + err.code + "): " + err.message);
                // }

                // target = {
                //     latitude: 0,
                //     longitude: 0,
                // };

                // options = {
                //     enableHighAccuracy: false,
                //     timeout: 5000,
                //     maximumAge: 0,
                // };

                // id = navigator.geolocation.watchPosition(success, error, options);

            } else {
                console.log("desactivé")
            }






        }
    }
}
</script>

<style scoped></style>