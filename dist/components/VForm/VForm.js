import { defineComponent, provide, h } from 'vue';
export default defineComponent({
    name: 'v-form',
    setup(_, { slots }) {
        let fields = [];
        const addFieldValidator = (item) => {
            fields.push(item);
        };
        const removeFieldValidator = (item) => {
            fields = fields.filter((v) => v !== item);
        };
        provide('form', {
            add: addFieldValidator,
            remove: removeFieldValidator,
        });
        const validate = () => {
            const promises = [];
            fields.forEach((v) => {
                promises.push(v());
            });
            return !promises.some((f) => !f) ? Promise.resolve() : Promise.reject();
        };
        return () => h('form', {
            class: 'v-form',
            onSubmit: (e) => e.preventDefault(),
        }, {
            default: () => slots.default && slots.default({ validate }),
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRm9ybS9WRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFFakQsZUFBZSxlQUFlLENBQUM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO1FBQ2hCLElBQUksTUFBTSxHQUE4QyxFQUFFLENBQUE7UUFFMUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFBO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUE7UUFDM0MsQ0FBQyxDQUFBO1FBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNkLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIsTUFBTSxFQUFFLG9CQUFvQjtTQUM3QixDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDcEIsTUFBTSxRQUFRLEdBQTRCLEVBQUUsQ0FBQTtZQUU1QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBcUMsRUFBRSxFQUFFO2dCQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDekUsQ0FBQyxDQUFBO1FBRUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ25CLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFO1NBQ3BDLEVBQ0Q7WUFDRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDNUQsQ0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcHJvdmlkZSwgaCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3YtZm9ybScsXG4gIHNldHVwKF8sIHsgc2xvdHMgfSkge1xuICAgIGxldCBmaWVsZHM6IEFycmF5PCguLi5hcmdzOiBhbnkpID0+IFByb21pc2U8Ym9vbGVhbj4+ID0gW11cblxuICAgIGNvbnN0IGFkZEZpZWxkVmFsaWRhdG9yID0gKGl0ZW0pID0+IHtcbiAgICAgIGZpZWxkcy5wdXNoKGl0ZW0pXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlRmllbGRWYWxpZGF0b3IgPSAoaXRlbSkgPT4ge1xuICAgICAgZmllbGRzID0gZmllbGRzLmZpbHRlcigodikgPT4gdiAhPT0gaXRlbSlcbiAgICB9XG5cbiAgICBwcm92aWRlKCdmb3JtJywge1xuICAgICAgYWRkOiBhZGRGaWVsZFZhbGlkYXRvcixcbiAgICAgIHJlbW92ZTogcmVtb3ZlRmllbGRWYWxpZGF0b3IsXG4gICAgfSlcblxuICAgIGNvbnN0IHZhbGlkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXM6IEFycmF5PFByb21pc2U8Ym9vbGVhbj4+ID0gW11cblxuICAgICAgZmllbGRzLmZvckVhY2goKHY6ICguLi5hcmdzOiBhbnkpID0+IFByb21pc2U8Ym9vbGVhbj4pID0+IHtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh2KCkpXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gIXByb21pc2VzLnNvbWUoKGYpID0+ICFmKSA/IFByb21pc2UucmVzb2x2ZSgpIDogUHJvbWlzZS5yZWplY3QoKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKCdmb3JtJywge1xuICAgICAgICBjbGFzczogJ3YtZm9ybScsXG4gICAgICAgIG9uU3VibWl0OiAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KHsgdmFsaWRhdGUgfSksXG4gICAgICB9LFxuICAgIClcbiAgfSxcbn0pXG4iXX0=