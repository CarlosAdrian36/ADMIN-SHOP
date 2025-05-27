import { getPRoductos } from '../../products/actions/get-products.action';
<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>

  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Architecto</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Corrupti</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <span>Excepturi</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
      <span>Consectetur</span>
    </a>
  </div>
  <div v-if="!products" class="item-center">
    <svg stroke="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke-linecap="round">
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </div>

  <ProductList v-else :products="products" />
  <ButtonPagination :has-more-data="!!products && products.length < 10" :page="page" />
</template>

<script setup lang="ts">
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { getProductsActions } from '@/modules/products/actions';
import ProductList from '@/modules/products/components/ProductList.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const queryClient = useQueryClient();

const { data: products = [] } = useQuery({
  queryKey: ['productos', { page: page }],
  queryFn: () => getProductsActions(page.value),
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
);

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['productos', { page: page.value + 1 }],
    queryFn: () => getProductsActions(page.value + 1),
  });
});

getProductsActions();
</script>
