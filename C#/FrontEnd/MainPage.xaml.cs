using FrontEnd.Services;

namespace FrontEnd
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {

            InitializeComponent();
            GetData();
        }

        private async void GetData()
        {
            HttpService httpService = new HttpService();
            var data = await httpService.GetPeopleAsync();

            PeopleListView.ItemsSource = data;
        }

    }

}
