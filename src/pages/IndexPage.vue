<template>
  <q-page padding>
    <q-table title="Treats" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>

        <span class="text-h5">Artigos</span>

        <q-space/>

        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          label="Remove row"
          @click="removeRow"
        />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
         
        <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEditPost(props.row.id)"
          />
        

        <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeletePost(props.row.id)"
          />
          </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import postsService from "src/services/posts";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "IndexPage",

  setup() {
    const router = useRouter()

    const posts = ref([]);
    const { list, remove } = postsService();

    const columns = [
      { name: "id", label: "Id", field: "id", align: "left", sortable: true },
      {
        name: "title",
        label: "Título",
        field: "title",
        align: "left",
        sortable: true,
      },
      {
        name: "author",
        label: "Autor",
        field: "author",
        align: "left",
        sortable: true,
      },

      {
        name: "actions",
        label: "Ações",
        field: "actions",
        align: "right",
      },
    ];

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        const data = await list();
        posts.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const handleEditPost = async (id) => {
      try {
        router.push({ name: 'formPost', params: { id }})
      } catch (error) {
        alert(error);
      }
    };

    const handleDeletePost = async (id) => {
      try {
        await remove(id);
        await getPosts();
      } catch (error) {
        alert(error);
      }
    };

    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost,
    };
  },
});
</script>
