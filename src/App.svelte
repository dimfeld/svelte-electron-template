<script>
  import Nav from './components/nav.svelte';
  import Button from './components/Button.svelte';
  const { ipc, SettingsStore, logger } = window.api;
  const settings = new SettingsStore();

  let menuItems = [
    { link: '#', name: 'Docs' },
    { link: '#', name: 'Home' },
    { link: '#', name: 'Blog' },
  ];
</script>

<Nav {menuItems} />
<Button text="Something" />
