<template>
  <q-page padding>
    <q-table title="Treats" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"/>
      </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import postsService from "src/services/posts";
import { useQuasar } from 'quasar'
export default defineComponent({
  name: "IndexPage",

  setup() {
    const $q = useQuasar()

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

    const handleDeletePost = async (id) => {
      try {
        await remove(id)
        $q.notify({
          message: 'Apagado com sucesso',
          icon: 'check',
          color: 'positive'
        })
         await getPosts()
      } catch (error) {
        $q.notify({
          message: 'Erro',
          icon: 'times',
          color: 'negative'
        })
      }
    }

    return {
      posts,
      columns,
      handleDeletePost,
    };
  },
});
</script>
