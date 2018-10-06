	import http from "k6/http";
	import {
	  sleep,
	  check
	} from "k6";

	const randomID = Math.floor(Math.random() * 1000000);

	export let options = {
	  vus: 400,
	  duration: "10s"
	};

	export default function () {
	  let res = http.get(`http://localhost:3002/artist/relatedArtists/${randomID}`);
	  check(res, {
	    "status was 200": (r) => r.status == 200,
	    "transaction time OK": (r) => r.timings.duration < 200
	  });
	};