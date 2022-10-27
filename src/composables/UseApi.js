import { api } from "boot/axios";
import { Dialog } from "quasar";
import { Notify } from 'quasar'
export default function useApi(url) {
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const post = async (form) => {

    try {
      const { data } = await api.post(url, form);
      Notify.create({
        type: 'positive',
        message: 'Registro adicionado com sucesso!'
      })
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form);
      Notify.create({
        type: 'positive',
        message: 'Registro editado com sucesso!'
      })
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const remove = (id) => {
    try {
      Dialog.create({
        title: "Excluir registro",
        message: "Deseja excluir esse registro?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        Notify.create({
          type: 'negative',
          message: 'Registro deletado com sucesso!'
        })
        const { data } = await api.delete(`${url}/${id}`);
        return data;
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    list,
    post,
    update,
    remove,
    getById
  };
}
