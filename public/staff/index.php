<?php require_once('../../private/initialize.php'); ?>

<?php $page_title = 'Travel Admin'?>
<?php include(SHARED_PATH . '/staff_header.php'); ?>

<div id="content">
<div id="main-menu">
  <h2>Main Menu</h2>
    <ul>
     <li><a href="<?php echo url_for('/staff/subjects/index.php'); ?>">Subjects</a>
     </li>
    </ul>
</div>
</div>


<?php include(SHARED_PATH . '/staff_footer.php'); ?>