<?php
  if(!isset($page_title)) { $page_title = 'Staff Area'; }
?>

<!doctype html>

<html lang="en">
  <head>
    <title>Travel - <?php echo $page_title; ?></title>
    <meta charset="utf-8">
    <link rel="stylesheet" media="all" href="<?php echo url_for('/stylesheets/staff.css'); ?>" />
  </head>

  <body>
    <header>
      <h1>Travel Staff Area</h1>
    </header>

    <navigation>
      <ul>
        <li><a href="<?php echo WWW_ROOT . '/staff/index.php'; ?>">Menu</a></li>
      </ul>
    </navigation>