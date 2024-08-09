import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "live_IIL8z8HkjJouob1FroBleB2FOhIj6zIRAGH9LEm2ehgoCJmAS62EjIVxBA0DP9AP";

interface Breed {
	id: string;
	name: string;
	image: {
		url: string;
	};
}

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.thecatapi.com/v1",
		prepareHeaders(headers) {
			headers.set("x-api-key", API_KEY);
			return headers;
		},
	}),
	endpoints(builder) {
		return {
			fetchBreeds: builder.query<Breed[], number | void>({
				query(limit = 10) {
					return `/breeds?limit=${limit}`;
				},
			}),
		};
	},
});

export const { useFetchBreedsQuery } = apiSlice;
