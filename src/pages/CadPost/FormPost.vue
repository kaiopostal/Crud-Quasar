<template>

  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">

      <q-input outlined v-model="form.title" class="col-lg-6 col-xs-12" label="Título" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']" />

      <q-input outlined v-model="form.author" class="col-lg-6 col-xs-12" label="Autor" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']" />

      <div class="col-lg-12 col-xs-12">

        <q-editor v-model="form.content" :definitions="{
        bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
      }" />

        <div class="col-md-12 q-gutter-sm">
          <q-space></q-space>
          <q-btn label="Salvar" color="primary" class="float-right" type="submit" icon="save"></q-btn>
          <q-btn label="Cancelar" color="white" text-color="primary" class="float-right" :to="{ name: 'home'}"></q-btn>

        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { defineComponent, ref, onMounted } from "vue";
  import postsService from "src/services/posts";
  import { useRouter, useRoute } from "vue-router";
  export default defineComponent({
    name: 'FormPost',

    setup() {

      const router = useRouter() 
      const route = useRoute()
      const { post, getById, update } = postsService()

      const form = ref({
        title  : '',
        content: '',
        author : ''
      })

      onMounted( async () => {
        if(route.params.id) {
          getPost(route.params.id)
        }
      })

      const getPost = async (id) => {
        try {
          const response = await getById(id)
          form.value = response
        } catch (error) {
          console.log(error)
        }
      }

      const onSubmit = async () => {
        try {
          if(form.value.id){
            await update(form.value)
            router.push( { name: 'home'})
          }else{
            await post(form.value)
            router.push( { name: 'home'})

          }
        } catch (error) {
          console.error(error)
        }
      }
      return {
        form,
        onSubmit
      }
    }
  })

</script>
